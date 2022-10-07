const LABEL_SIZES = {
    S: 'size_s',
    M: 'size_m',
    L: 'size_l',
    XL: 'size_xl'
};

const LABEL_COLORS = {
    S: '12c800',
    M: 'b3c800',
    L: 'c87300',
    XL: 'c80000'
};

const LABEL_CONFIG = (inputs) => [
    {
        name: LABEL_SIZES.S,
        size: inputs.size_s,
        color: LABEL_COLORS.S,
    },
    {
        name: LABEL_SIZES.M,
        size: inputs.size_m,
        color: LABEL_COLORS.M,
    },
    {
        name: LABEL_SIZES.L,
        size: inputs.size_l,
        color: LABEL_COLORS.L,
    },
    {
        name: LABEL_SIZES.XL,
        size: inputs.size_xl,
        color: LABEL_COLORS.XL,
    },
];


module.exports = {
    LABEL_CONFIG
};
