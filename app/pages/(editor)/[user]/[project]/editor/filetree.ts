import type { TreeItem } from "@nuxt/ui"

/**
 * Converts a file name to an icon class based on its extension and the current theme.
 *
 * @param fn - The file name to convert.
 * @param theme - The current theme, either "dark" or "light".
 * @returns The icon class corresponding to the file name and theme.
 */
export const fn2icon = (fn: string, theme: string) => {
    const ext = fn.split(".").pop()?.toLowerCase()
    switch (ext) {
    case "tex":
        return theme === "dark" ? "i-vscode-icons-file-type-tex" : "i-vscode-icons-file-type-light-tex"
    case "bib":
        return theme === "dark" ? "i-vscode-icons-file-type-tex" : "i-vscode-icons-file-type-light-tex"
    case "pdf":
        return "i-vscode-icons-file-type-pdf2"
    case "md":
        return "i-vscode-icons-file-type-markdown"
    case "txt":
        return "i-vscode-icons-file-type-text"
        // figures
    case "png":
        return "i-vscode-icons-file-type-image"
    case "jpg":
        return "i-vscode-icons-file-type-image"
    case "eps":
        return "i-vscode-icons-file-type-eps"
        // MS Office
    case "ppt":
        return "i-vscode-icons-file-type-powerpoint"
    case "pptx":
        return "i-vscode-icons-file-type-powerpoint"
    case "doc":
        return "i-vscode-icons-file-type-word"
    case "docx":
        return "i-vscode-icons-file-type-word"
    case "xls":
        return "i-vscode-icons-file-type-excel"
    case "xlsx":
        return "i-vscode-icons-file-type-excel"
    default:
        return "i-vscode-icons-default-file"
    }
}

/**
 * Adds necessary attributes to tree items, including icons and hierarchical values.
 *
 * @param treeItems - An array of `TreeItem` objects to be formatted.
 * @param dirname - The directory name to prepend to the `value` attribute of each tree item. Defaults to "/".
 * @param theme - The theme to determine the appropriate icon for each file. Defaults to "light".
 * @returns The formatted array of `TreeItem` objects with updated `icon` and `value` attributes.
 */
export const formatItems = (treeItems: TreeItem[], dirname: string = "/", theme: string = "light"): TreeItem[] => {
    return treeItems.map((item) => {
        if (!item.label) {
            return item
        } else {
            const isFile = item.label && !item.label.endsWith("/")
            const newItem: TreeItem = {
                label: item.label,
                icon: isFile ? fn2icon(item.label, theme) : undefined,
                type: isFile ? "file" : "folder",
                value: dirname + item.label,
                defaultExpanded: item.defaultExpanded ?? false,
            }
            if (item.children && item.children.length > 0) {
                newItem.children = formatItems(item.children, newItem.value, theme)
            }
            return newItem
        }
    })
}
