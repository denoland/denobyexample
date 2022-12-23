import { TOC } from '../toc.js'

for await (const dirEntry of Deno.readDir('data')) {
  if(dirEntry.isDirectory) {
    throw `Unexpected directory ${dirEntry.name} in data`
  }
  if(dirEntry.isSymlink) {
    throw `Unexpected symlink ${dirEntry.name} in data`
  }

  const slug = dirEntry.name.slice(0, -3)

  if(!TOC.includes(slug)) {
    throw `${dirEntry.name} is not listed in toc.js`
  }
}