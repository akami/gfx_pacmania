/*
 *       d ----------- c
 *      /             /
 *     /             /
 *    a ----------- b
 */
class Plane extends Shape {
    static PLANE_NORMAL = [0.0,  1.0,  0.0];
    static PLANE_SIZE = 21;
    static PLANE_UNIT = (Plane.PLANE_SIZE - 1) / 2;

    getVertices() {
        // x, y, z
        let a = [-Plane.PLANE_UNIT, 0, Plane.PLANE_UNIT];
        let b = [Plane.PLANE_UNIT, 0, Plane.PLANE_UNIT];
        let c = [Plane.PLANE_UNIT, 0, -Plane.PLANE_UNIT];
        let d = [-Plane.PLANE_UNIT, 0, -Plane.PLANE_UNIT];

        return [[
            d, a, b,
            d, b, c
        ]];
    }

    getNormals() {
        let normals = [];

        for (let j = 0; j < 6; j++) {
            normals.push(Plane.PLANE_NORMAL);
        }

        return normals;
    }

    throwsShadow() {
        return false;
    }
}
