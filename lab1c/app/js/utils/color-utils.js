/*
 * @module Foundations of Computer Graphics
 * @author Katharina Hoeckner
 * a01638800
 * SS2021
 * University of Vienna
 */

/**
 * This class is responsible for color handling. It essentially assigns random colors to vertices.
 */
class ColorUtils {
    static repeatColor(color, numberOfTimes) {
        let colors = [];

        for (let i = 0; i < numberOfTimes; i++) {
            colors.push(color);
        }

        return colors;
    }
}
