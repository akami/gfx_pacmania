/*
 * References: https://developer.mozilla.org/en-US/docs/Games/Techniques/3D_collision_detection
 */
class CollisionDetectionUtil {
    detectCollision(pacman, objects, direction, comparisonValue) {
        for (let i = 0; i < objects.length; i++) {
            let moveX = 0, moveZ = 0;
            switch (direction) {
                case Direction.NORTH:
                    moveZ = -comparisonValue;
                    break;
                case Direction.EAST:
                    moveX = comparisonValue;
                    break;
                case Direction.SOUTH:
                    moveZ = comparisonValue;
                    break;
                case Direction.WEST:
                    moveX = -comparisonValue;
                    break;
            }

            if (this.detectIntersectingBoundingBoxes(pacman._boundingBox, objects[i]._boundingBox, moveX, moveZ)) {
                return objects[i];
            }
        }

        return undefined;
    }

    detectIntersectingBoundingBoxes(box1, box2, moveX, moveZ) {
        return (box1.minX + moveX <= box2.maxX && box1.maxX + moveX >= box2.minX) &&
            (box1.minZ + moveZ <= box2.maxZ && box1.maxZ + moveZ >= box2.minZ);
    }
}
