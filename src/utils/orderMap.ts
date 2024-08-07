const orderMaps = {
    "Laptops/Notebooks": [
        "Processor",
        "Graphic card",
        "Screen diagonal",
        "RAM",
        "Hard drive",
        "Screen resolution",
        "Touchscreen",
        "Operating system",
        "Battery capacity",
        "Color",
        "Length",
        "Width",
        "Thickness",
        "Weight"
    ],
    Tablets: [
        "Screen diagonal",
        "Screen resolution",
        "Rear camera",
        "Front camera",
        "Processor",
        "Graphics chip",
        "RAM",
        "Built-in memory",
        "Screen refresh rate",
        "Operating system",
        "Fingerprint reader",
        "Battery"
    ],
    "Bags and cases": [
        "Type",
        "Compatibility",
        "Size",
        "Weight",
        "Color",
        "Material",
        "Type of fastener"
    ],
    "Smartphones and phones": [
        "Processor",
        "RAM",
        "Built-in memory",
        "Screen diagonal",
        "Screen type",
        "Screen resolution",
        "Screen refresh rate",
        "Pixel density",
        "Rear camera",
        "Front camera",
        "Operating system",
        "Fingerprint reader",
        "Battery capacity",
        "Fast charging",
        "Color",
        "Height",
        "Width",
        "Thickness",
        "Weight"
    ],
    Smartwatches: [
        "Connectivity",
        "Display diagonal",
        "Display resolution",
        "Satellite navigation",
        "Display type",
        "Types of activity",
        "Color"
    ],
    Processors: [
        "Processor socket",
        "Architecture",
        "Number of cores",
        "Number of threads",
        "Core clock",
        "Core clock in turbo mode",
        "Unlocked core multiplier",
        "Cache memory",
        "Integrated graphics chip",
        "Lithographic process",
        "TDP",
        "Cooling included"
    ],
    "Graphic cards": [
        "Graphics card series",
        "Graphics chip",
        "Memory",
        "Type of memory",
        "Memory bus",
        "Memory clocking",
        "Core clocking",
        "CUDA cores",
        "Ray tracing support",
        "Type of connector",
        "Power connector",
        "Recommended power supply power"
    ]
};

export const orderMap = Object.fromEntries(
    Object.entries(orderMaps).map(([key, values]) => [
        key,
        new Map(values.map((name, index) => [name, index]))
    ])
);
