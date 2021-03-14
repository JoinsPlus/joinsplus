const axios = require('axios').default
const qs = require('qs')
const fs = require('fs')

axios({
    method: 'post',
    url: 'https://api.poeditor.com/v2/languages/list',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify({
        api_token: 'd91b5566391a5f9bdd0aff0028e3e488',
        id: '422847'
    })
}).then(async (response) => {
    let langs = response.data.result.languages.map((lang) => {
        return lang.code
    })
    let output = {}
    for (let i = 0; i < langs.length; i++) {
        output[langs[i]] = await exportLang(langs[i])
    }
    fs.writeFileSync('./src/i18n.json', JSON.stringify(output))
}).catch((err) => {

})

function exportLang(code) {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: 'https://api.poeditor.com/v2/projects/export',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify({
                api_token: 'd91b5566391a5f9bdd0aff0028e3e488',
                id: '422847',
                language: code,
                type: 'key_value_json'
            })
        }).then((response) => {
            axios({
                method: 'get',
                url: response.data.result.url,
                headers: {}
            }).then((response) => {
                let result = {}
                let categories = Object.keys(response.data)
                for (let i = 0; i < categories.length; i++) {
                    let category = response.data[categories[i]]
                    let keys = Object.keys(category)
                    for (let x = 0; x < keys.length; x++) {
                        result[keys[x]] = category[keys[x]]
                    }
                }
                resolve(result)
            }).catch((err) => {
                reject(err)
            })
        }).catch((err) => {
            reject(err)
        })
    })
}
