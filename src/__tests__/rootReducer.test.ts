import { rootReducer } from "../services/store.ts";
import { api } from "../../utils/api";
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { getIngredients } from "./actions";
import { allIngredients, initialState, reducer, sortIngredients, withoutBuns } from "./slice";
import { store } from "../store";
import { afterAll, beforeEach, expect, test, jest } from '@jest/globals';

const initialTestStore = {
    ingredients: [
        {
            "name": "Краторная булка N-200i",
            "type": "bun",
            "proteins": 80,
            "fat": 24,
            "carbohydrates": 53,
            "calories": 420,
            "price": 1255,
            "image": "https://code.s3.yandex.net/react/code/bun-02.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
            "__v": 0
        },
        {
            "_id": "643d69a5c3f7b9001cfa0948",
            "name": "Кристаллы марсианских альфа-сахаридов",
            "type": "main",
            "proteins": 234,
            "fat": 432,
            "carbohydrates": 111,
            "calories": 189,
            "price": 762,
            "image": "https://code.s3.yandex.net/react/code/core.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/core-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/core-large.png",
            "__v": 0
        }
    ],
    isLoading: false
}

beforeEach(() => {
    
})

describe('тесты', () => {
    test('sortIngredients', () => {
        const ingredientsState = reducer(initialTestStore, sortIngredients({from: 1, to: 0}));
        const { ingredients } = ingredientsState;
        expect(ingredients).toEqual([
            {
                "_id": "643d69a5c3f7b9001cfa093c",
                "name": "Краторная булка N-200i",
                "type": "bun",
                "proteins": 80,
                "fat": 24,
                "carbohydrates": 53,
                "calories": 420,
                "price": 1255,
                "image": "https://code.s3.yandex.net/react/code/bun-02.png",
                "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
                "__v": 0
            },
            {
                "_id": "643d69a5c3f7b9001cfa0948",
                "name": "Кристаллы марсианских альфа-сахаридов",
                "type": "main",
                "proteins": 234,
                "fat": 432,
                "carbohydrates": 111,
                "calories": 189,
                "price": 762,
                "image": "https://code.s3.yandex.net/react/code/core.png",
                "image_mobile": "https://code.s3.yandex.net/react/code/core-mobile.png",
                "image_large": "https://code.s3.yandex.net/react/code/core-large.png",
                "__v": 0
            }
        ])
    });
});

afterAll(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
})
