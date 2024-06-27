const createSlug = (productName: string) => {
    return productName.toLowerCase().replace(/\s+/g, "-").replace(/\//g, "-");
};

export default createSlug;
