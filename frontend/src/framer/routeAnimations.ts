export const routeEaseInLeft = {
    initial: {
        x: '-100vw',
    },
    final: {
        x: '0vw',
        transition: {
            type: 'easeIn',
            mass: 0.4,
        },
    },
}
export const routeEaseInRight = {
    initial: {
        x: '100vw',
    },
    final: {
        x: '0vw',
        transition: {
            type: 'easeIn',
            mass: 0.4,
        },
    },
}