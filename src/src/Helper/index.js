export function trimFileName ( add, l = 5 ) {
    if ( add.length > 12 ) {
        return (
            String( add ).slice( 0, 2 ) +
            String( add ).slice( 2, 2 + l ) +
            "..." +
            String( add ).slice( add.length - l, add.length )
        )
    } else {
        return add
    }
}