import React from "react";
import { CanvasJSChart, CanvasJS } from "canvasjs-react-charts";

export const Graphic = ({ dataPoints = [] }) => {
  console.log(dataPoints);
  return (
    <CanvasJSChart
      options={{
        animationEnabled: true,
        theme: "light2",
        title: {
          text: "Temperature and Date",
        },
        axisY: {
          title: "Temperature",
          logarithmic: true,
          maximum: 100,
          minimum: 1,
        },
        axisX: {
          title: "Timestamp",
          logarithmic: true,
          valueFormatString: "hh:mm TT",
          labelFormatter: function (e) {
            return CanvasJS.formatDate(e.value, "hh:mm");
          },
        },
        data: [
          {
            type: "line",
            showInLegend: true,
            toolTipContent: "Temperature {y}C",
            legendText: "Temperature Graphic",
            dataPoints,
          },
        ],
      }}
    />
  );
};

Graphic.uiName = "Graphic";
Graphic.displayName = "Graphic";
