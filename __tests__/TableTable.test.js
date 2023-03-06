import { TableTable } from "~~/.nuxt/components"
import { mount, shallowMount  } from '@vue/test-utils'
// import {expect, describe, jest, test} from '@jest/globals';

test("Test for tabletable displaying 1 item on every next page click", () => {
    const wrapper = mount(TableTable, {
        props: {
            columns: [
                {name: "Age", key: "age"},
                {name: "Price", key: "price"},
                {name: "Rating", key: "rating"},
            ],
            data: [
                {age: "old", price: "expensive", rating: "HIGH"},
                {age: "young", price: "cheap", rating: "stone"},
                {age: "mid age", price: "money is not everything", rating: "HIGH"},
            ],
            filters: null,
            pageSize: 1,
            focusedRow: null
        }
    })

    expect(wrapper.text()).toContain("Showing 1 of 3 items")
    expect(wrapper.text()).toContain("expensive")
    
    // click next page (page 2)
    wrapper.find('[class="inline fa fa-chevron-right rounded-full bg-gray-200 p-1 mx-4]"').trigger('click')
    expect(wrapper.text()).toContain("young")

    
    // click prev page (page 1)
    wrapper.find('[class="inline fa fa-chevron-left rounded-full bg-gray-200 p-1 mx-4]"').trigger('click')
    expect(wrapper.text()).toContain("old")

    
    // click prec page (stay on page 1)
    wrapper.find('[class="inline fa fa-chevron-left rounded-full bg-gray-200 p-1 mx-4]"').trigger('click')
    expect(wrapper.text()).toContain("old")

})

test("Test for tabletable focusing row", () => {
    const wrapper = mount(TableTable, {
        props: {
            columns: [
                {name: "Colour", key: "colour"},
                {name: "Height", key: "height"},
                {name: "Number of ribbons", key: "ribbonsNumber"},
            ],
            data: [
                {colour: "red", height: "1.80", ribbonsNumber: "5"},
                {colour: "green", height: "toe", ribbonsNumber: "many"},
                {colour: "gray", height: "underground", ribbonsNumber: "much"},
            ],
            filters: null,
            pageSize: 2,
            focusedRow: {colour: "gray", height: "underground", ribbonsNumber: "much"}
        }
    })

    expect(wrapper.find("[data='green']").classes("bg-slate-100")).toBe(true)
    expect(wrapper.find("[data='red']").classes("bg-slate-100")).toBe(false)

    // click on first row, check if if is focused
    wrapper.find("tr").trigger("click")
    expect(wrapper.classes()).toContain("bg-slate-100")
    expect(wrapper.find([data='green']).classes("bg-slate-100")).toBe(false)
})

test("Test for sorting items", () => {
    const wrapper = mount(TableTable, {
        props: {
            columns: [
                {name: "Colour", key: "colour"},
                {name: "Height", key: "height"},
                {name: "Number of ribbons", key: "ribbonsNumber"},
            ],
            data: [
                {colour: "red", height: "1.80", ribbonsNumber: "5"},
                {colour: "green", height: "toe", ribbonsNumber: "many"},
                {colour: "gray", height: "underground", ribbonsNumber: "much"},
            ],
            filters: null,
            pageSize: 2,
            focusedRow: {colour: "gray", height: "underground", ribbonsNumber: "much"}
        }
    }) 
    
    wrapper.find("th").trigger("click")
    expect(wrapper.find("i").classes()).toContain("fa-chevron-down")
    // gray should be the first one
    expect(wrapper.find("table-cell").text()).toContain("gray")
    
    wrapper.find("th").trigger("click")
    expect(wrapper.find("i").classes()).toContain("fa-chevron-up")
    // red should be the first one
    expect(wrapper.find("table-cell").text()).toContain("red")
})


test("Test for filtering items", () => {
    const wrapper = mount(TableTable, {
        props: {
            columns: [
                {name: "Colour", key: "colour"},
                {name: "Height", key: "height"},
                {name: "Number of ribbons", key: "ribbonsNumber"},
            ],
            data: [
                {colour: "red", height: "1.80", ribbonsNumber: "5"},
                {colour: "green", height: "toe", ribbonsNumber: "many"},
                {colour: "gray", height: "underground", ribbonsNumber: "much"},
            ],
            filters: [
                {key: 'colour', value: 'gr', type: 'text'}
            ],
            pageSize: 3,
            focusedRow: null
        }
    }) 
    
    expect(wrapper.text()).toContain("gray")
    expect(wrapper.text()).toContain("green")
    expect(wrapper.text().toContain("red")).toBe(false)

    // sort the items
    wrapper.find("th").trigger("click")
    expect(wrapper.find("table-cell").text()).toContain("gray")
})