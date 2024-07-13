// class LocalStorageHandler<T> {
//     private readonly key: string;

//     constructor(key: string) {
//         this.key = key;
//     }

//     saveData(data: T) {
//         localStorage.setItem(this.key, JSON.stringify(data));
//     }

//     retrieveData(): T | null {
//         const storedData = localStorage.getItem(this.key);
//         if (storedData) {
//             return JSON.parse(storedData) as T;
//         }
//         return null;
//     }
// }

// // Factory function to create a new instance of LocalStorageHandler
// const createLocalStorageHandler = <T>(key: string) => {
//     return new LocalStorageHandler<T>(key);
// };

// export default createLocalStorageHandler;
