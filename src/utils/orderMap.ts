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
    "Bags and cases": [
        "Type",
        "Compatibility",
        "Size",
        "Weight",
        "Color",
        "Material",
        "Type of fastener"
    ]
};

export const orderMap = Object.fromEntries(
    Object.entries(orderMaps).map(([key, values]) => [
        key,
        new Map(values.map((name, index) => [name, index]))
    ])
);
