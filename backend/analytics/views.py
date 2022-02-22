from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Value, CharField
from django.db.models.functions import ExtractMonth, ExtractYear, Concat
from django.db.models import Count
from .serializers import PolicyDetailSerializer

from policy.models import PolicyDetail
# Create your views here.


def format_date(year:int, month:int):
    if month < 10:
        formatted_date = f"{year}-0{month}"
    else:
        formatted_date = f"{year}-{month}"
    return formatted_date


@api_view(['GET'])
def policies(request):
    '''
    Returns List of month wise policies
    optionally can specify a filter on region using the region query_parameter to get region wise data
    '''
    region_filter = request.query_params.get("region", None)
    try:
        if region_filter is not None:
            query_result = PolicyDetail.objects \
                .filter(customer_region=region_filter)\
                .annotate(year=ExtractYear("date_of_purchase"), month=ExtractMonth("date_of_purchase"))\
                .values("year", "month").annotate(count=Count("id"))
        else:
            query_result = PolicyDetail.objects\
                .annotate(year=ExtractYear("date_of_purchase"), month=ExtractMonth("date_of_purchase"))\
                .values("year", "month").annotate(count=Count("id"))
        serializer = PolicyDetailSerializer(query_result, many=True)
        result = []
        if serializer.data:
            for i in serializer.data:
                formatted_date = format_date(i["year"], i["month"])
                result.append(
                    {"date": formatted_date, "count": i["count"]})
        return Response(result, status=200)
    except Exception as e:
        print(e)
