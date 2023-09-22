import { useEffect, useRef } from "react";
import * as d3 from "d3";

import { ContentT } from "@src/types/state";
import { getChartData, getRandomColor } from "@src/utils/chart";

interface ChartProps {
  content?: ContentT[];
}

export const Chart = ({ content }: ChartProps) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const chartData = getChartData(content);

    if (!svgRef.current) return;
    if (!chartData) return;
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current);

    const width = 800; // 막대 차트의 너비
    const height = 300; // 막대 차트의 높이
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    // x축 스케일 설정
    const x = d3
      .scaleBand()
      .domain(chartData.map((d) => d.name))
      .range([margin.left, width - margin.right])
      .padding(0.3);

    // y축 스케일 설정
    const y = d3
      .scaleLinear()
      .domain([0, 10]) // 값의 범위는 0부터 10까지
      .nice()
      .range([height - margin.bottom, margin.top]);

    // x축 생성
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    // y축 생성
    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(5));

    // 막대 그래프 생성
    svg
      .selectAll("rect")
      .data(chartData)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.name)!)
      .attr("y", (d) => y(d.value))
      .attr("width", x.bandwidth())
      .attr("height", (d) => y(0) - y(d.value))
      .attr("fill", () => getRandomColor()); // 랜덤한 색상 할당
  }, [content?.length]);

  return (
    <div className="hidden sm:flex justify-center ">
      <svg ref={svgRef} width={800} height={300}>
        {/* 막대 차트가 여기에 그려질 것입니다. */}
      </svg>
    </div>
  );
};
