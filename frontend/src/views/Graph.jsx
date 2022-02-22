import React, { useRef, useLayoutEffect, useEffect, useState } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import Container from "react-bootstrap/Container";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import axios from "axios";
import { url } from "../url";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

am4core.useTheme(am4themes_animated);

export default function Graph(props) {
  const [graphData, setGraphData] = useState(null);
  const [regionData, setRegionData] = useState(null);
  const selectBox = useRef("");

  function make_url(region) {
    if (region === null || region === "") {
      return `${url}/analytics/policies`;
    } else {
      return `${url}/analytics/policies/?region=${region}`;
    }
  }

  const fetch_graph_data = async (region = null) => {
    try {
      const custom_url = make_url(region);
      let response = await axios.get(custom_url);
      setGraphData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetch_regions = async () => {
    try {
      let response = await axios.get(`${url}/policy/regions`);
      setRegionData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onSelectHandler = () => {
    let region_name = selectBox.current.value;
    fetch_graph_data(region_name);
  };
  useEffect(() => {
    fetch_graph_data();
    fetch_regions();
  }, []);
  const chart = useRef(null);

  useLayoutEffect(() => {
    let x = am4core.create("chartdiv", am4charts.XYChart);

    x.paddingRight = 20;
    x.data = graphData && graphData;

    let dateAxis = x.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    let valueAxis = x.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;

    let series = x.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.fillOpacity = 0.3;
    
    series.tensionX = 0.8;
    series.dataFields.valueY = "count";
    
    series.tooltipText = '{date}: [bold]{valueY}[/]';
    x.cursor = new am4charts.XYCursor();

    let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    x.scrollbarX = scrollbarX;

    chart.current = x;

    return () => {
      x.dispose();
    };
  }, [graphData]);

  return (
    <>
      <br />
      <Container>
        <Row>
          <Col lg={4}></Col>
          <Col lg={3} style={{ textAlign: "center", fontSize: "20px" }}>
            <span>
              <b>MONTHLY SALES REPORT</b>
            </span>
          </Col>
          <Col lg={2}></Col>
          <Col lg={3}>
            <Form.Select
              aria-label="Select Region"
              ref={selectBox}
              onChange={onSelectHandler}
            >
              <option value="">Select Region</option>
              {regionData &&
                regionData.map((ele) => {
                  return (
                    <option value={ele.customer_region}>
                      {ele.customer_region}
                    </option>
                  );
                })}
            </Form.Select>
          </Col>

          <Col lg={1}></Col>
        </Row>
      </Container>
      <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
    </>
  );
}
