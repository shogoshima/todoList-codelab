export function taskColor(d) {
    let red = 1000 * 60 * 60 * 24;
    let yellow = 1000 * 60 * 60 * 24 * 5;

    let date = new Date(d).getTime();
    let now = new Date();
    let dif = date - now;
    if (dif < 0)
        return 'black';
    else if (dif < red)
        return 'red';
    else if (dif < yellow)
        return 'yellow';
    return 'green';
}