/*
 *       ____________
 *     /h           / g
 *    e ----------- f |
 *    | |___________| |
 *    |/ d          | |c
 *    a ----------- b/
 */
class Cube extends Shape {
    static SIZE = 1.0;

    static FRONT_NORMAL = [0.0, 0.0, 1.0];
    static RIGHT_NORMAL = [1.0, 0.0, 0.0];
    static BACK_NORMAL = [0.0, 0.0, -1.0];
    static LEFT_NORMAL = [-1.0, 0.0, 0.0];
    static TOP_NORMAL = [0.0, 1.0, 0.0];
    static BOTTOM_NORMAL = [0.0, -1.0, 0.0];

    getVertices() {
        // x, y, z
        let a = [-Cube.SIZE / 2, -Cube.SIZE / 2, Cube.SIZE / 2];
        let b = [Cube.SIZE / 2, -Cube.SIZE / 2, Cube.SIZE / 2];
        let c = [Cube.SIZE / 2, -Cube.SIZE / 2, -Cube.SIZE / 2];
        let d = [-Cube.SIZE / 2, -Cube.SIZE / 2, -Cube.SIZE / 2];
        let e = [-Cube.SIZE / 2, Cube.SIZE / 2, Cube.SIZE / 2];
        let f = [Cube.SIZE / 2, Cube.SIZE / 2, Cube.SIZE / 2];
        let g = [Cube.SIZE / 2, Cube.SIZE / 2, -Cube.SIZE / 2];
        let h = [-Cube.SIZE / 2, Cube.SIZE / 2, -Cube.SIZE / 2];

        let frontFace = [
            e, a, b,
            e, b, f
        ];

        let rightFace = [
            f, b, c,
            f, c, g
        ];

        let backFace = [
            g, c, d,
            g, d, h
        ];

        let leftFace = [
            h, d, a,
            h, a, e
        ];

        let topFace = [
            h, e, f,
            h, f, g
        ];

        let bottomFace = [
            d, a, b,
            d, b, c
        ];

        return [
            frontFace,
            rightFace,
            backFace,
            leftFace,
            topFace,
            bottomFace
        ];
    }

    getNormals() {
        let normals = [
            Cube.FRONT_NORMAL,
            Cube.RIGHT_NORMAL,
            Cube.BACK_NORMAL,
            Cube.LEFT_NORMAL,
            Cube.TOP_NORMAL,
            Cube.BOTTOM_NORMAL
        ];
        let newNormals = [];

        for (let i = 0; i < normals.length; i++) {
            for (let j = 0; j < 6; j++) {
                newNormals.push(normals[i]);
            }
        }

        return newNormals;
    }
}
