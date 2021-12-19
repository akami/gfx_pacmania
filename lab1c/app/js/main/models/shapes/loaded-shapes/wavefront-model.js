/**
 * This class represents models that we get using obj. files. It is responsible for converting the data into a form we
 * can use in the project.
 */
class WavefrontModel extends Shape {

    /**
     * To transform the two arrays we get out of the obj. file (indices, vertices) using the parseSource() function,
     * we have to first iterate through the indices array. The indices array will have a form like e.g.
     * [[12, 2, 323], [232, 23, 22], ...], where each array represents a list of three indices in the vertices array.
     *
     * We then create a new array (triangle), and iterate through the numbers stored in each array. We then store the
     * positions of the vertices that correspond to the index in the triangle array.
     * It will then have a form like:
     * [12, 2, 323] --> [[1, 1, 1], [0, 1, 0], [0, 0, 0]]
     *
     * Pushing the triangle array into a newVertices array will finally result in an array of the form we look for:
     * [[[1, 1, 1], [0, 1, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]], ...]
     * @returns {*[]}
     */
    getVertices() {
        let {indices, vertices} = this.parseSource();
        const newVertices = [];

        for (let i = 0; i < indices.length; i++) {
            let triangle = [];

            for (let j = 0; j < indices[i].length; j++) {
                triangle.push(vertices[indices[i][j][0]]);
            }

            newVertices.push(triangle);
        }

        return newVertices;
    }

    // TODO documentation
    getNormals() {
        let {indices, normals} = this.parseSource();

        let newNormals = [];
        for (let i = 0; i < indices.length; i++) {
            let triangle = [];

            for (let j = 0; j < indices[i].length; j++) {
                triangle.push(normals[indices[i][j][1]]);
            }

            newNormals.push(triangle);
        }

        return newNormals;
    }

    // TODO documentation
    getColors() {
        let {colors, indices} = this.parseSource();

        if (colors.length > 0) {
            const newColors = [];

            for (let i = 0; i < indices.length; i++) {
                let triangle = [];

                for (let j = 0; j < indices[i].length; j++) {
                    triangle.push(colors[indices[i][j][1]]);
                }

                newColors.push(triangle);
            }

            return newColors;
        }

        else return super.getColors();
    }

    /**
     * This function converts the data in the obj. file to two arrays: vertices & indices.
     * @returns {{indices: *[], vertices: *[]}}
     */
    parseSource() {
        let {source, scale} = this._additionalData !== undefined ? this._additionalData : undefined;
        const indices = [];
        const vertices = [];
        const normals = [];
        const colors = [];

        let sourceLines = source.split("\n");

        for (let i = 0; i < sourceLines.length; i++) {
            let sourceLine = sourceLines[i];
            let sourceLineParts = sourceLine.split(" ");

            if (sourceLineParts.length >= 4) {
                if (sourceLineParts[0] === "vn") {
                    normals.push([parseFloat(sourceLineParts[1]), parseFloat(sourceLineParts[2]), parseFloat(sourceLineParts[3])]);
                } else if (sourceLineParts[0] === "v") {
                    vertices.push([parseFloat(sourceLineParts[1]) * scale, parseFloat(sourceLineParts[2]) * scale, parseFloat(sourceLineParts[3]) * scale]);

                    // if there is color information attached
                    if(sourceLineParts.length >= 5) {
                        colors.push([parseFloat(sourceLineParts[4]), parseFloat(sourceLineParts[5]), parseFloat(sourceLineParts[6])]);
                    }
                } else if (sourceLineParts[0] === "f") {
                    let index = [];

                    for (let j = 1; j < sourceLineParts.length; j++) {
                        let indexParts = sourceLineParts[j].split("/");

                        index.push([parseInt(indexParts[0]) - 1, parseInt(indexParts[2]) - 1]);
                    }

                    indices.push(index);
                }
            }
        }

        return {indices, vertices, normals, colors};
    }
}
