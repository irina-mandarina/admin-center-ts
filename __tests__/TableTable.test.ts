import TableTable  from "../components/TableTable.vue"
import TableCell  from "../components/TableCell.vue"
import { mount  } from '@vue/test-utils'
import { test, expect } from 'vitest'

test("Test for tabletable displaying 1 item on every next page click", () => {
    const wrapper = mount(TableTable, {
        props: {
            columns: [
                {name: "Age", key: "age"},
                {name: "Price", key: "price"},
                {name: "Rating", key: "rating"},
            ],
            data: [
                {age: "old", price: "900", rating: "5"},
                {age: "young", price: "645", rating: "1"},
                {age: "mid age", price: "3", rating: "5"},
            ],
            filters: null,
            pageSize: 1,
            focusedRow: null
        }
    })

    expect(wrapper.text()).toContain("Age Price Rating  Showing 1 of 3 items  1")

    expect(wrapper.html().includes("<tablecell data=\"old\">")).toBeTruthy()
    expect(wrapper.html().includes("<tablecell data=\"young\">")).toBeFalsy()
    
    const text = (wrapper.html())
    // click next page (page 2)

    
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
    // expect(wrapper.find([data='green']).classes("bg-slate-100")).toBe(false)
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
    // expect(wrapper.text()).toContain("red")).toBe(false)

    // sort the items
    wrapper.find("th").trigger("click")
    expect(wrapper.find("table-cell").text()).toContain("gray")
})
