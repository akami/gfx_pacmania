/*
 *       d ----------- c
 *      /             /
 *     /             /
 *    a ----------- b
 */
class Plane extends Shape {
    getVertices() {
        // x, y, z
        const a = [-PLANE_UNIT, 0, PLANE_UNIT];
        const b = [PLANE_UNIT, 0, PLANE_UNIT];
        const c = [PLANE_UNIT, 0, -PLANE_UNIT];
        const d = [-PLANE_UNIT, 0, -PLANE_UNIT];

        return this.setUpTriangles([a, b, c, d]);
    }

    getNormals() {
        return this.setUpNormals([PLANE_NORMAL]);
    }

    setUpTriangles(vertices) {
        const a = vertices[0];
        const b = vertices[1];
        const c = vertices[2];
        const d = vertices[3];

        const plane = [
            d, a, b,
            d, b, c
        ];

        return [plane];
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
