// Create the Polynomial component
const PolynomialPlot = () => {
  const [xRange, setXRange] = React.useState([-1, 2]);
  const [pointCount] = React.useState(200);
  const [yLimit, setYLimit] = React.useState(5);
  
  // Function to evaluate the polynomial: -x^6 + 6x^5 - 15x^4 + 20x^3 - 15x^2 + 6x
  const evaluatePolynomial = (x) => {
    return -Math.pow(x, 6) + 6 * Math.pow(x, 5) - 15 * Math.pow(x, 4) + 
           20 * Math.pow(x, 3) - 15 * Math.pow(x, 2) + 6 * x;
  };
  
  // Generate data points for the plot
  const generateData = () => {
    const data = [];
    const step = (xRange[1] - xRange[0]) / pointCount;
    
    for (let i = 0; i <= pointCount; i++) {
      const x = xRange[0] + i * step;
      const y = evaluatePolynomial(x);
      
      if (y >= -yLimit && y <= yLimit) {
        data.push({ x, y });
      } else {
        data.push({ 
          x, 
          y: y > yLimit ? yLimit : -yLimit,
          outOfBounds: true 
        });
      }
    }
    
    return data;
  };

  const handleRangeChange = (min, max) => {
    setXRange([parseFloat(min), parseFloat(max)]);
  };

  const handleYLimitChange = (limit) => {
    setYLimit(parseFloat(limit));
  };

  const data = generateData();
  
  // Find roots
  const roots = [
    { x: 0, y: 0, label: 'Root: x=0' },
    { x: 1, y: 0, label: 'Root: x=1' }
  ];

  // Use Recharts components
  const { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } = Recharts;

  return React.createElement('div', { className: "w-full max-w-4xl mx-auto p-4" }, [
    React.createElement('div', { className: "mb-4 text-center", key: "header" }, [
      React.createElement('h2', { className: "text-xl font-bold mb-2", key: "title" }, 
        "Polynomial: -x^6 + 6x^5 - 15x^4 + 20x^3 - 15x^2 + 6x = x(1-x)^5"),
      React.createElement('div', { className: "flex flex-wrap justify-center gap-4 mt-2", key: "controls" }, [
        React.createElement('div', { key: "xrange" }, [
          React.createElement('label', { className: "mr-2" }, "X-Range:"),
          React.createElement('input', { 
            type: "number", 
            className: "w-16 border border-gray-300 rounded px-2 py-1",
            value: xRange[0],
            onChange: (e) => handleRangeChange(e.target.value, xRange[1]),
            step: "0.5"
          }),
          React.createElement('span', { className: "mx-1" }, "to"),
          React.createElement('input', { 
            type: "number", 
            className: "w-16 border border-gray-300 rounded px-2 py-1",
            value: xRange[1],
            onChange: (e) => handleRangeChange(xRange[0], e.target.value),
            step: "0.5"
          })
        ]),
        React.createElement('div', { key: "ylimit" }, [
          React.createElement('label', { className: "mr-2" }, "Y-Limit: ±"),
          React.createElement('input', { 
            type: "number", 
            className: "w-16 border border-gray-300 rounded px-2 py-1",
            value: yLimit,
            onChange: (e) => handleYLimitChange(e.target.value),
            min: "1",
            step: "1"
          })
        ])
      ])
    ]),
    React.createElement('div', { className: "border border-gray-200 rounded-lg p-4 bg-white", key: "chart" },
      React.createElement(ResponsiveContainer, { width: "100%", height: 400 },
        React.createElement(LineChart, { 
          margin: { top: 20, right: 30, left: 30, bottom: 10 }
        }, [
          React.createElement(CartesianGrid, { strokeDasharray: "3 3", key: "grid" }),
          React.createElement(XAxis, { 
            type: "number", 
            dataKey: "x", 
            domain: [xRange[0], xRange[1]],
            allowDataOverflow: true,
            key: "x-axis"
          }),
          React.createElement(YAxis, { 
            domain: [-yLimit, yLimit], 
            allowDataOverflow: true,
            key: "y-axis" 
          }),
          React.createElement(Tooltip, {
            formatter: (value) => [value.toFixed(4), "y"],
            labelFormatter: (value) => `x: ${value.toFixed(4)}`,
            key: "tooltip"
          }),
          React.createElement(Legend, { key: "legend" }),
          React.createElement(Line, {
            data: data, 
            type: "monotone", 
            dataKey: "y", 
            stroke: "#8884d8", 
            strokeWidth: 2,
            dot: false,
            name: "Polynomial",
            isAnimationActive: false,
            key: "polynomial-line"
          }),
          React.createElement(Line, {
            data: roots, 
            type: "none", 
            dataKey: "y", 
            stroke: "none", 
            strokeWidth: 0,
            name: "Roots",
            isAnimationActive: false,
            dot: { r: 6, fill: 'green' },
            key: "roots-line"
          })
        ])
      )
    ),
    React.createElement('div', { className: "mt-4 text-sm", key: "notes" }, [
      React.createElement('p', { key: "notes-title" }, [
        React.createElement('strong', {}, "Key Observations:")
      ]),
      React.createElement('ul', { className: "list-disc pl-6 mt-1", key: "notes-list" }, [
        React.createElement('li', { key: "note1" }, "The polynomial can be factored as x(1-x)^5"),
        React.createElement('li', { key: "note2" }, "It has roots (zeros) at x=0 and x=1 (the green dots)"),
        React.createElement('li', { key: "note3" }, "At x=0: It's a simple root (crosses the x-axis)"),
        React.createElement('li', { key: "note4" }, "At x=1: It's a root of multiplicity 5 (touches but doesn't cross the x-axis)"),
        React.createElement('li', { key: "note5" }, "You can adjust the viewing window using the controls above")
      ])
    ])
  ]);
};

// Render the component
const domContainer = document.querySelector('#root');
ReactDOM.render(React.createElement(PolynomialPlot), domContainer);