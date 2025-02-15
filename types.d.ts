// declare global {
//     namespace Express {
//         interface User {
//             id: number;
//         }
//     }
// }
// export{};

declare namespace Express {
    interface User {
        id: number;
        name: string;
        email?: string;
        password?: string;
    }
}

