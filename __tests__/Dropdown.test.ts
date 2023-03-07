// const Dropdown =  require('../components/Dropdown.vue')
import Dropdown  from "../components/Dropdown.vue"
import { mount, shallowMount  } from '@vue/test-utils'
import { test, expect } from 'vitest'


const div = document.createElement('div')
div.id = 'root'
document.body.appendChild(div)


test("Test for dropdown showing items on focus in", async () => {
    const wrapper = mount(Dropdown, {
        attachTo: '#root',
        props: {
            name: "Basket",
            selectKey: "basket",
            options: ["apple", "pear", "orange"],
            displayOption: null
        }
    })

    expect(wrapper.text()).toContain('Basket')
    const a = wrapper.html()
    const b = wrapper.find('button')
    await b.trigger('focus-in')
    const d = wrapper.html()
    expect(wrapper.text()).toContain('apple')
})    
