interface Point2D { // or maybe 'class Point2D' also
    x: number;
    y: number;
}

interface Point3D extends Point2D {
    z: number;
}

interface Square {
    kind: 'square';
    latus: number;
}

interface Rectangle {
    kind: 'rectangle';
    width: number;
    height: number;
}

interface Circle {
    kind: 'circle';
    radius: number;
}

const area = (s: Square | Rectangle | Circle): number => {
    switch (s.kind) {
        case 'square':
            return s.latus * s.latus;
        case 'rectangle':
            return s.width * s.height;
        case 'circle':
            return 2 * Math.PI * s.radius * s.radius;
    }
}

// readonly props
interface CameraAspectRatio {
    readonly x: number;
    readonly y: number;
}

let car1: CameraAspectRatio = { x: 16, y: 9 }
// car1.x = 34; - Error

let arrtmp: number[] = [1, 2, 3, 4];
let roa: ReadonlyArray<number> = arrtmp;
// All methods that modified it are removed (push, etc)
let newarr: number[] = roa as number[];

// functional types
interface FnSearch {
    (source: string, subString: string): boolean;   // fn call signature
}

let myFnSearch: FnSearch;
myFnSearch = (source: string, subString: string): boolean => {
    let result = source.search(subString);
    return !(result === -1)
}

export default Square;
export type { Point2D };