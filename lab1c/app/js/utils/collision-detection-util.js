/*
 * References: https://developer.mozilla.org/en-US/docs/Games/Techniques/3D_collision_detection
 */
class CollisionDetectionUtil {
    detectCollision(pacman, objects, direction) {
        for (let i = 0; i < objects.length; i++) {
            let moveX = 0, moveZ = 0;
            switch (direction) {
                case Direction.NORTH:
                    moveZ = -MOVEMENT_SPEED;
                    break;
                case Direction.EAST:
                    moveX = MOVEMENT_SPEED;
                    break;
                case Direction.SOUTH:
                    moveZ = MOVEMENT_SPEED;
                    break;
                case Direction.WEST:
                    moveX = -MOVEMENT_SPEED;
                    break;
            }

            if(objects[i]._boundingBox === undefined) {
                console.log(objects);
                console.log(i);
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
