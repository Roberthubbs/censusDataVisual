(function () {

    var uStates = {};

    uStates.draw = function (id, data, toolTip) {
        function mouseOver(d) {
            // selection.transition - 在选中元素上开启过渡
            d3.select("#tooltip").transition().duration(500).style("opacity", .9);

            d3.select("#tooltip").html(toolTip(d.n, data[d.id]))
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        }

        function mouseOut() {
            d3.select("#tooltip").transition().duration(500).style("opacity", 0);
        }

        function click(d) {
            alert(d.n);
        }

        // D3使用CSS3来选择页面元素
        d3.select(id).selectAll(".state")
            .data(uStatePaths).enter().append("path").attr("class", "state").attr("d", function (d) { return d.d; })
            .style("fill", function (d) { return data[d.id].color; })
            .on("mouseover", mouseOver).on("mouseout", mouseOut).on('click', click);
    }
    this.uStates = uStates;

})();