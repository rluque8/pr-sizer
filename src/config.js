const LABEL_SIZES = {
    S: 'size_s',
    M: 'size_m',
    L: 'size_l',
    XL: 'size_xl'
};

const LABEL_COLORS = {
    S: 'size_s',
    M: 'size_m',
    L: 'size_l',
    XL: 'size_xl'
};

const LABEL_CONFIG = (tools) => [
    {
        name: 'size_s',
        size: tools.inputs.s_max_size,
        color: '12c800',
    },
    {
        name: 'size_m',
        size: tools.inputs.m_max_size,
        color: 'b3c800',
    },
    {
        name: 'size_l',
        size: tools.inputs.l_max_size,
        color: 'c87300',
    },
    {
        name: 'size_xl',
        size: tools.inputs.xl_max_size,
        color: 'c80000',
    },
];


module.exports = {
    LABEL_CONFIG
};
