const puppeteer = require('puppeteer')
const fs = require('fs/promises')

async function start(){
    const browser = await puppeteer.launch()
    
    const page = await browser.newPage()

    const mainURL = "https://github.com/CollinSCaldwell"
    const urlADD = "?tab=repositories"

    await page.goto(mainURL + urlADD)


    const links = await page.$$eval(".wb-break-all a", (lks) => lks.map(x=>x.href))

    console.log(links)
    for(const lin of links){
        const newLink = lin.slice(lin.lastIndexOf('/'))
        await page.goto(mainURL + newLink)
        const repoName = await page.$$eval("div.Box-body.px-5.pb-5 article", name => name.map(x=>x.textContent))

        //console.log(repoName[0].slice(0, repoName[0].indexOf('\n')))
        
        //console.log(repoName[0].slice(repoName[0].indexOf('\n')))

        console.log(repoName[0]);

        console.log('\n\n\n')

    }



    await browser.close()
}

start()