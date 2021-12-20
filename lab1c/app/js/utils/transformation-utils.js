class TransformationUtils {
    static scale(matrix, xScale, yScale, zScale) {
        let scalingVector = [xScale, yScale, zScale];
        mat4.scale(matrix, matrix, scalingVector);
    }

    static rotate(matrix, xRotation, yRotation, zRotation) {
        mat4.rotateX(matrix, matrix, glMatrix.toRadian(xRotation));
        mat4.rotateY(matrix, matrix, glMatrix.toRadian(yRotation));
        mat4.rotateZ(matrix, matrix, glMatrix.toRadian(zRotation));
    }

    static translate(matrix, xMovement, yMovement, zMovement) {
        mat4.translate(matrix, matrix, [xMovement, 0, 0]);
        mat4.translate(matrix, matrix, [0, yMovement, 0]);
        mat4.translate(matrix, matrix, [0, 0, zMovement]);
    }
}
