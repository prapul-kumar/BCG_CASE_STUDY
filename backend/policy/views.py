from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .serializers import PolicyDetailSerializer, PolicyRegionSerializer
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.db.models import Q

from policy.models import PolicyDetail


@api_view(['GET', 'PATCH'])
def policies(request):
    '''
    GET Request: Returns List of policies based on three inputs
    1)Page Number
    2)pageLength
    3)search_value
    
    Designed for server side pagination and Searching based on Customer ID/Policy ID
    
    PATCH REQUEST: Takes Policy ID and New Premium value as inputs
    Returns a confirmation string with updated value if successful
    '''
    if request.method == 'GET':
        try:

            response_data = {}
            page_num = request.query_params.get('page_num', 1)
            pageLength = request.query_params.get('pageLength', 10)
            search_value = request.query_params.get('search_value', None)

            if search_value is None or search_value == "":
                queryset = PolicyDetail.objects.all().order_by('policy_id')
            else:
                queryset = PolicyDetail.objects.filter(
                    Q(policy_id__icontains=search_value) | Q(customer_id__icontains=search_value)).order_by('policy_id')

            paginator = Paginator(queryset, pageLength)
            page_data = paginator.page(page_num)
            serialized_data = PolicyDetailSerializer(page_data, many=True)

        except PageNotAnInteger:
            page_data = paginator.page(1)
            page_num = 1
            serialized_data = PolicyDetailSerializer(page_data, many=True)

        except EmptyPage:
            page_num = paginator.num_pages
            page_data = paginator.page(page_num)
            serialized_data = PolicyDetailSerializer(page_data, many=True)

        response_data["total_policy_count"] = paginator.count
        response_data["total_num_pages"] = paginator.num_pages
        response_data["current_page"] = int(page_num)
        response_data["has_next_page"] = page_data.has_next()
        response_data["has_previous_page"] = page_data.has_previous()
        response_data["data_per_page"] = pageLength
        response_data["data"] = serialized_data.data

        return Response(response_data)

    elif request.method == 'PATCH':
        try:
            new_premium = request.data.get("premium")
            policy_id = request.data.get("policy_id")
            policy_obj = get_object_or_404(PolicyDetail, policy_id=policy_id)
            data_to_verify = {
                "premium": new_premium
            }
            serializer = PolicyDetailSerializer(policy_obj,
                                                data=data_to_verify, partial=True)

            if serializer.is_valid():
                policy_obj.premium = new_premium
                policy_obj.save()
                return Response(f"Policy ID: {policy_obj.policy_id} updated successfully. New premium = {new_premium}")
            else:
                return Response(f"Premium invalid, Make sure the value is in range 0 to 1M ")

        except Exception as e:
            print(e)


@api_view(['GET'])
def regions(request):
    '''
    Returns List of distinct regions 
    '''
    if request.method == 'GET':
        try:
            query_result = PolicyDetail.objects.values(
                "customer_region").distinct()
            serializer = PolicyRegionSerializer(query_result, many=True)
            return Response(serializer.data)
        except Exception as e:
            print(e)
