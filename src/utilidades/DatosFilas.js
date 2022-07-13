
function crearDato(name, calories, fat, carbs, protein, price) {
    return {
        name,
        calories,
        fat,
        carbs,
        protein,
        price,
        history: [
            {
                date: '2020-01-05',
                customerId: '11091700',
                amount: 3,
            },
            {
                date: '2020-01-02',
                customerId: 'Anonymous',
                amount: 1,
            },
        ],
    }
}

const filas = [
    crearDato('Cupcake', 305, 3.7, 24, 4.0, 3.99),
    crearDato('Donut', 452, 25.0, 24, 4.0, 3.99),
    crearDato('Eclair', 262, 16.0, 24, 4.0, 3.99),
    crearDato('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
    crearDato('Gingerbread', 356, 16.0, 24, 4.0, 3.99),
    crearDato('Honeycomb', 408, 3.2, 24, 4.0, 3.99),
    crearDato('Ice cream sandwich', 237, 9.0, 24, 4.0, 3.99),
    crearDato('Jelly Bean', 375, 0.0, 24, 4.0, 3.99),
    crearDato('KitKat', 518, 26.0, 24, 4.0, 3.99),
    crearDato('Lollipop', 392, 0.2, 24, 4.0, 3.99),
    crearDato('Marshmallow', 318, 0, 24, 4.0, 3.99),
    crearDato('Nougat', 360, 19.0, 24, 4.0, 3.99),
    crearDato('Oreo', 437, 18.0, 24, 4.0, 3.99),
].sort((a, b) => (a.calories < b.calories ? -1 : 1))


export default filas