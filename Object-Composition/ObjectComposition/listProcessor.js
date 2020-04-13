function solve(args) {
    const process = {
        add: (a, s) => a.concat(s),
        remove: (a, s) => a.filter(e => e !== s),
        print: (a, _) => {
            console.log(a.join(','));
            return a;
        }
    };

    let arr = [];

    for (let i = 0; i < args.length; i++) {
        const [command, string] = args[i].split(" ");
        arr = process[command](arr, string);
    }
}

solve(['add hello', 'add again', 'remove hello', 'add again', 'print']);
solve(['add pesho', 'add george', 'add peter', 'remove peter', 'print']);
solve(['add JSFundamentals', 'print', 'add JSAdvanced', 'print','add JSApplications','print']);