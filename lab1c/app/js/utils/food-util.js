class FoodUtil {
    static setUpFood(context, sphereSource) {
        let food = [];

        let z = -9;
        for (let x = -9; x <= -1; x++) {
            food.push(new Food(context, [x, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        }

        for (let x = 3; x <= 9; x++) {
            food.push(new Food(context, [x, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        }

        z = -8;
        food.push(new Food(context, [-9, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        food.push(new Food(context, [-5, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        food.push(new Food(context, [9, 0.5, z], {shapeSources: {sphere: sphereSource}}));

        for (let x = -1; x <= 3; x++) {
            food.push(new Food(context, [x, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        }

        food.push(new Food(context, [5, 0.5, z], {shapeSources: {sphere: sphereSource}}));

        z = -7;
        for (let x = -9; x <= -1; x++) {
            food.push(new Food(context, [x, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        }

        food.push(new Food(context, [1, 0.5, z], {shapeSources: {sphere: sphereSource}}));

        for (let x = 3; x <= 7; x++) {
            food.push(new Food(context, [x, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        }

        food.push(new Food(context, [9, 0.5, z], {shapeSources: {sphere: sphereSource}}));

        z = -6;
        food.push(new Food(context, [-9, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        food.push(new Food(context, [-5, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        food.push(new Food(context, [3, 0.5, z], {shapeSources: {sphere: sphereSource}}));

        for (let x = -1; x <= 1; x++) {
            food.push(new Food(context, [x, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        }
        for (let x = 7; x <= 9; x++) {
            food.push(new Food(context, [x, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        }

        z = -5;

        food.push(new Food(context, [1, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        food.push(new Food(context, [9, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        for (let x = -9; x <= -1; x++) {
            food.push(new Food(context, [x, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        }
        for (let x = 3; x <= 5; x++) {
            food.push(new Food(context, [x, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        }

        z = -4;
        food.push(new Food(context, [-7, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        food.push(new Food(context, [-3, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        for (let x = -1; x <= 3; x++) {
            food.push(new Food(context, [x, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        }
        for (let x = 5; x <= 9; x++) {
            food.push(new Food(context, [x, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        }

        z = -3;
        food.push(new Food(context, [2, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        food.push(new Food(context, [8, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        for (let x = -7; x <= -6; x++) {
            food.push(new Food(context, [x, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        }
        for (let x = -4; x <= -2; x++) {
            food.push(new Food(context, [x, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        }

        z = -2;
        food.push(new Food(context, [-6, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        for (let x = -4; x <= -2; x++) {
            food.push(new Food(context, [x, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        }
        for (let x = 2; x <= 8; x++) {
            food.push(new Food(context, [x, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        }

        z = -1;
        food.push(new Food(context, [4, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        food.push(new Food(context, [8, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        for (let x = -9; x <= -8; x++) {
            food.push(new Food(context, [x, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        }
        for (let x = -6; x <= -4; x++) {
            food.push(new Food(context, [x, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        }

        z = 0;
        food.push(new Food(context, [-8, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        food.push(new Food(context, [-6, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        for (let x = -4; x <= 8; x++) {
            food.push(new Food(context, [x, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        }

        z = 1;
        food.push(new Food(context, [4, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        food.push(new Food(context, [8, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        for (let x = -8; x <= -4; x++) {
            food.push(new Food(context, [x, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        }

        z = 2;
        for (let x = -4; x <= -2; x++) {
            food.push(new Food(context, [x, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        }
        for (let x = 2; x <= 9; x++) {
            food.push(new Food(context, [x, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        }

        z = 3;
        food.push(new Food(context, [-2, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        food.push(new Food(context, [2, 0.5, z], {shapeSources: {sphere: sphereSource}}));

        z = 4;
        for (let x = -2; x <= 2; x++) {
            food.push(new Food(context, [x, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        }

        z = 5;
        food.push(new Food(context, [-2, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        for (let x = -9; x <= -6; x++) {
            food.push(new Food(context, [x, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        }
        for (let x = 1; x <= 2; x++) {
            food.push(new Food(context, [x, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        }
        for (let x = 6; x <= 9; x++) {
            food.push(new Food(context, [x, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        }

        z = 6;
        food.push(new Food(context, [9, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        for (let x = -6; x <= -2; x++) {
            food.push(new Food(context, [x, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        }
        for (let x = 0; x <= 4; x++) {
            food.push(new Food(context, [x, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        }

        z = 7;
        food.push(new Food(context, [-3, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        for (let x = 4; x <= 9; x++) {
            food.push(new Food(context, [x, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        }

        z = 8;
        food.push(new Food(context, [5, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        food.push(new Food(context, [9, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        for (let x = -3; x <= -2; x++) {
            food.push(new Food(context, [x, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        }

        z = 9;
        for (let x = -9; x <= 9; x++) {
            food.push(new Food(context, [x, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        }

        let x = -9;
        for (let z = -4; z <= -2; z++) {
            food.push(new Food(context, [x, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        }
        for (let z = 6; z <= 8; z++) {
            food.push(new Food(context, [x, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        }

        x = -8;
        for (let z = 2; z <= 4; z++) {
            food.push(new Food(context, [x, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        }

        x = -6;
        for (let z = 2; z <= 4; z++) {
            food.push(new Food(context, [x, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        }
        for (let z = 7; z <= 8; z++) {
            food.push(new Food(context, [x, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        }

        x = -4;
        for (let z = 3; z <= 5; z++) {
            food.push(new Food(context, [x, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        }

        x = 0;
        for (let z = -3; z <= -1; z++) {
            food.push(new Food(context, [x, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        }
        for (let z = 1; z <= 3; z++) {
            food.push(new Food(context, [x, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        }
        for (let z = 7; z <= 8; z++) {
            food.push(new Food(context, [x, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        }

        x = 4;
        for (let z = 3; z <= 5; z++) {
            food.push(new Food(context, [x, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        }

        x = 6;
        for (let z = 3; z <= 4; z++) {
            food.push(new Food(context, [x, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        }

        x = 9;
        for (let z = 3; z <= 4; z++) {
            food.push(new Food(context, [x, 0.5, z], {shapeSources: {sphere: sphereSource}}));
        }

        return food;
    }
}
