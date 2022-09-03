import { Faction } from "./consts"

export function appendLabel(elem: Element, text: string, type: Faction) {
  const div = document.createElement("span")
  div.className = `plusplus-label ${factionToClass(type)}`

  const img = document.createElement("img")
  img.src = chrome.runtime.getURL("images/pohottu.svg")
  img.className = "plusplus-logo"

  const span = document.createElement("span")
  span.className = "lblpp"
  span.textContent = text

  div.appendChild(img)
  div.appendChild(span)

  elem.appendChild(div)
}

/**
 * Filter and get only unique elements
 * @param already Already found elements
 * @param newFound New found elements (may contain already found elements)
 * @returns Filtered elements
 */
export function filterUniqueElements(already: Element[], newFound: Element[]) {
  return newFound.filter(x => {
    for (let i = 0; i < already.length; i++) {
      if (x.isEqualNode(already[i])) {
        return false
      }
    }

    return true
  })
}

export function stringToFaction(faction: string): Faction {
  switch (faction) {
    case "pohottu":
      return Faction.Pohottu
    case "unp":
      return Faction.UNP
    case "paidFakeAccount":
      return Faction.PaidFakeAccount
  }

  return Faction.PaidFakeAccount
}

export function factionToClass(faction: Faction): string {
  switch (faction) {
    case Faction.Pohottu:
      return "fbpp-pohottu"
    case Faction.UNP:
      return "fbpp-unp"
    case Faction.PaidFakeAccount:
      return "fbpp-paid"
  }
}

export function factionToTitle(faction: Faction): string {
  switch (faction) {
    case Faction.Pohottu:
      return "බයියෙක්"
    case Faction.UNP:
      return "ටොයියෙක්"
    case Faction.PaidFakeAccount:
      return "Paid Fake Account"
  }
}

export function validProfileId(id: string): boolean {
  if (id.includes("profile.php")) {
    return false
  }

  return true
}

function getParameterByName(name: string, url: string) {
  // eslint-disable-next-line no-useless-escape
  name = name.replace(/[\[\]]/g, "\\$&")
  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ""
  return decodeURIComponent(results[2].replace(/\+/g, " "))
}

// TODO DETECT ALL STRATEGIES
export function sanitizeID(href: string): string {
  if (href.includes("profile.php")) {
    console.log(" FOUND ID HREF:", href)
    const urlSearchParams = new URLSearchParams(href)
    return urlSearchParams.get("id") as string
  }

  const id = href.split("?")[0]
  const slashes = id.split("/")

  if (id.endsWith("/")) {
    return slashes[slashes.length - 2]
  }

  return slashes[slashes.length - 1]
}
