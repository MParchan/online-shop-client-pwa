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
    ]
};

export const orderMap = Object.fromEntries(
    Object.entries(orderMaps).map(([key, values]) => [
        key,
        new Map(values.map((name, index) => [name, index]))
    ])
);
