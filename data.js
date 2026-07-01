// Competitive positioning map data.
// x/y are 0-100 on the chart. x: local/regional focus -> national scale.
// y: value/simplicity -> premium/performance.
// Edit this array to move dots, change copy, or add/remove competitors —
// app.js will pick up any changes automatically.

const BRANDS = [
  {
    name: "Kinetic",
    x: 22, y: 38,
    tag: "Insurgent / Local Value",
    color: "#F5D949",
    desc: "Challenger fiber provider for smaller markets; simplicity and no-nonsense pricing as the core pitch. Differentiator: network density in secondary/tertiary markets where it's often the only real fiber alternative."
  },
  {
    name: "Xfinity",
    x: 88, y: 70,
    tag: "Scale & Reach",
    color: "#4A90E2",
    desc: "The biggest, most available network; scale and bundling. Serves 90%+ of the Fortune 500 via the largest fiber-powered network in the U.S."
  },
  {
    name: "Spectrum",
    x: 70, y: 22,
    tag: "Value & Flexibility",
    color: "#3FAE7C",
    desc: "Budget/no-contract value pick. Low introductory pricing with no data caps and no-contract options."
  },
  {
    name: "AT&T Fiber",
    x: 82, y: 88,
    tag: "Performance / Symmetry",
    color: "#DE4F94",
    desc: "Pure fiber performance leader. Symmetrical fiber speeds up to 5 Gbps with unlimited data."
  },
  {
    name: "Verizon Fios",
    x: 60, y: 78,
    tag: "Premium Reliability",
    color: "#0E1B3C",
    desc: "Premium fiber for dense Northeast markets. 100% fiber-optic network with nearly matching upload/download speeds and multi-year price locks."
  },
  {
    name: "T-Mobile Home Internet",
    x: 48, y: 55,
    tag: "Wireless Disruptor",
    color: "#8A63D2",
    desc: "Disruptor using wireless spectrum instead of wires. Expanding aggressively into fiber via a 2024 JV with KKR to acquire Metronet."
  }
];
