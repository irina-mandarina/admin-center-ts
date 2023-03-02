import Dropdown   from '~/components/Dropdown.vue'
import { mount, shallowMount  } from '@vue/test-utils'
// import {jest} from '@jest/globals';
// import.meta.jest.useFakeTimers();
import {expect, describe, jest, test} from '@jest/globals';
describe('', () => {
    test("Test for dropdown", () => {
        const wrapper = shallowMount(Dropdown, {
            props: {
                name: "Basket",
                selectKey: "basket",
                options: ["apple", "pear", "orange"],
                displayOption: null
            }
        })
        wrapper.find('button').trigger('click')
        expect(wrapper.text()).toContain('apple')
        expect(wrapper.find("Basket")).toBe(false)
    })    
})
