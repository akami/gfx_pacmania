/*
 *       ____________
 *     /h           / g
 *    e ----------- f |
 *    | |___________| |
 *    |/ d          | |c
 *    a ----------- b/
 */

const WIDTH = 1.0;
const HEIGHT = 1.0;
const LENGTH = 1.0;

const FRONT_NORMAL = [0.0,  0.0,  1.0];
const RIGHT_NORMAL = [1.0,  0.0,  0.0];
const BACK_NORMAL = [0.0,  0.0, -1.0];
const LEFT_NORMAL = [-1.0,  0.0,  0.0];
const TOP_NORMAL = [0.0,  1.0,  0.0];
const BOTTOM_NORMAL = [0.0, -1.0,  0.0];

class Wall extends Shape {
    getVertices() {
        // x, y, z
        const a = [0, 0, WIDTH/2];
        const b = [LENGTH, 0, WIDTH/2];
        const c = [LENGTH, 0, -WIDTH/2];
        const d = [0, 0, -WIDTH/2];
        const e = [0, HEIGHT, WIDTH/2];
        const f = [LENGTH, HEIGHT, WIDTH/2];
        const g = [LENGTH, HEIGHT, -WIDTH/2];
        const h = [0, HEIGHT, -WIDTH/2];

        return this.setUpTriangles([a, b, c, d, e, f, g, h]);
    }

    getNormals() {
        return this.setUpNormals([FRONT_NORMAL, RIGHT_NORMAL, BACK_NORMAL, LEFT_NORMAL, TOP_NORMAL, BOTTOM_NORMAL]);
    }

    setUpTriangles(vertices) {
        const a = vertices[0];
        const b = vertices[1];
        const c = vertices[2];
        const d = vertices[3];
        const e = vertices[4];
        const f = vertices[5];
        const g = vertices[6];
        const h = vertices[7];

        const frontFace = [
            e, a, b,
            e, b, f
        ];

        const rightFace = [
            f, b, c,
            f, c, g
        ];

        const backFace = [
            g, c, d,
            g, d, h
        ];

        const leftFace = [
            h, d, a,
            h, a, e
        ];

        const topFace = [
            h, e, f,
            h, f, g
        ];

        const bottomFace = [
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

    setUpNormals(normals) {
        const newNormals =[];

        for (let i = 0; i < normals.length; i++) {
            for (let j = 0; j < 6 ; j++) {
                newNormals.push(normals[i]);
            }
        }

        return newNormals;
    }
}
