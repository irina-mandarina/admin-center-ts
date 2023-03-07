import TableTable  from "../components/TableTable.vue"
import TableCell  from "../components/TableCell.vue"
import { mount  } from '@vue/test-utils'
import { test, expect } from 'vitest'

test("Test for tabletable displaying 1 item per page", async () => {
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
    
    // const prevPageBtn = wrapper.findAll('i').filter((i) => i?.wrapperElement?.className.includes('fa-chevron-left'))
    // const nextPageBtn = wrapper.findAll('i').filter((i) => i?.wrapperElement?.className.includes('fa-chevron-left'))

})

test("Test for tabletable with focused row prop", () => {
    const wrapper = mount(TableTable, {
        props: {
            columns: [
                {name: "Colour", key: "colour"},
                {name: "Height", key: "height"},
                {name: "Width", key: "width"},
            ],
            data: [
                {colour: "red", height: "1.80", width: "5 cm"},
                {colour: "green", height: "5 m", width: "7 cm"},
                {colour: "gray", height: "5 mm", width: "11 cm"},
            ],
            filters: null,
            pageSize: 3,
            focusedRow: {colour: "gray", height: "5 mm", width: "11 cm"}
        }
    })
    const focusedRow = wrapper.findAll("tr")[3]
    expect(focusedRow.wrapperElement.className.includes("bg-slate-100")).toBeTruthy()
})

test("Test for sorting items in descending order", () => {
    const wrapper = mount(TableTable, {
        props: {
            columns: [
                {name: "Colour", key: "colour"},
                {name: "Height", key: "height"},
                {name: "Width", key: "width"},
            ],
            data: [
                {colour: "red", height: "1", width: "5 cm"},
                {colour: "green", height: "2", width: "7 cm"},
                {colour: "gray", height: "3", width: "11 cm"},
            ],
            filters: null,
            pageSize: 1
        }
    }) 
    
    const h = wrapper.find("th")
    wrapper.find("th").trigger("click", {column: "colour"})

    expect(wrapper.html().includes('<tablecell data="red">')).toBeTruthy()
    expect(wrapper.html().includes('<tablecell data="gray">')).toBeFalsy()
})

test("Test for sorting items in ascending order", () => {
    const wrapper = mount(TableTable, {
        props: {
            columns: [
                {name: "Colour", key: "colour"},
                {name: "Height", key: "height"},
                {name: "Width", key: "width"},
            ],
            data: [
                {colour: "red", height: "1", width: "5 cm"},
                {colour: "green", height: "2", width: "7 cm"},
                {colour: "gray", height: "3", width: "11 cm"},
            ],
            filters: null,
            pageSize: 1
        }
    }) 
    
    const h = wrapper.find("th")
    wrapper.find("th").trigger("click", {column: "colour"})
    wrapper.find("th").trigger("click", {column: "colour"})

    expect(wrapper.html().includes('<tablecell data="red">')).toBeFalsy()
    expect(wrapper.html().includes('<tablecell data="gray">')).toBeTruthy()
})


test("Test for filtering items given 1 filter", () => {
    const wrapper = mount(TableTable, {
        props: {
            columns: [
                {name: "Colour", key: "colour"},
                {name: "Height", key: "height"},
                {name: "Count", key: "count"},
            ],
            data: [
                {colour: "red", height: "1.80", count: "5"},
                {colour: "green", height: "toe", count: "many"},
                {colour: "gray", height: "underground", count: "much"},
            ],
            filters: [
                {key: 'colour', value: 'gr', type: 'text'}
            ],
            pageSize: 3,
            focusedRow: null
        }
    })
    expect(wrapper.html().includes('<tablecell data="green">')).toBeTruthy()
    expect(wrapper.html().includes('<tablecell data="gray">')).toBeTruthy()
    expect(wrapper.html().includes('<tablecell data="red">')).toBeFalsy()
})


test("When tabletable is given 2 filters, expect 1 item", () => {
    const wrapper = mount(TableTable, {
        props: {
            columns: [
                {name: "Colour", key: "colour"},
                {name: "Height", key: "height"},
                {name: "Count", key: "count"},
            ],
            data: [
                {colour: "red", height: "1.80", count: "5"},
                {colour: "green", height: "tall", count: "a lot"},
                {colour: "gray", height: "-5 inches", count: "5390"},
            ],
            filters: [
                {key: 'colour', value: 'gr', type: 'text'},
                {key: 'height', value: 'tall', type: 'text'}
            ],
            pageSize: 1,
            focusedRow: null
        }
    })
    expect(wrapper.html().includes('<tablecell data="green">')).toBeTruthy()
    expect(wrapper.html().includes('<tablecell data="gray">')).toBeFalsy()
    expect(wrapper.html().includes('<tablecell data="red">')).toBeFalsy()
})

test("When tabletable is given 2 filters with identical keys, expect 0 items", () => {
    const wrapper = mount(TableTable, {
        props: {
            columns: [
                {name: "Colour", key: "colour"},
                {name: "Height", key: "height"},
                {name: "Count", key: "count"},
            ],
            data: [
                {colour: "red", height: "1.80", count: "5"},
                {colour: "green", height: "tall", count: "a lot"},
                {colour: "gray", height: "-5 inches", count: "5390"},
            ],
            filters: [
                {key: 'colour', value: 'gr', type: 'text'},
                {key: 'colour', value: 'red', type: 'text'}
            ],
            pageSize: 1,
            focusedRow: null
        }
    })
    expect(wrapper.html().includes('<tablecell data="green">')).toBeFalsy()
    expect(wrapper.html().includes('<tablecell data="gray">')).toBeFalsy()
    expect(wrapper.html().includes('<tablecell data="red">')).toBeFalsy()
})
