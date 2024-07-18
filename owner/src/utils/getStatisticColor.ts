const darkThemeColors = [
    "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", 
    "#9966FF", "#FF9F40", "#FFCD56", "#4BC0C0", 
    "#36A2EB", "#FF6384", "#FFCE56", "#9966FF", 
    "#FF9F40", "#4BC0C0", "#36A2EB", "#FF6384"
];

const getStatisticColor = (index: number) => {
    return darkThemeColors[index % darkThemeColors.length];
};

export default getStatisticColor;