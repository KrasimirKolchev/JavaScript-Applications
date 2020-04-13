function solve(args) {
    const commands = {
        create: (n, m) => m.set(n, {}),
        inherit: (n, o, m) => m.set(n, Object.create(m.get(o))),
        set: (n, kv, m) => m.set(n, Object.assign(m.get(n), kv)),
        print: (n, m) => {
            let obj = m.get(n);
            let out = [];
            for (const key in obj) {
                out.push(`${key}:${obj[key]}`);
            }
            console.log(out.join(', '))
        }
    };

    let carMap = new Map();

    for (let i = 0; i < args.length; i++) {
        const commands = args[i].split(' ');
        commands.length === 2 ? process1(commands) : process2(commands);
    }
    function process1(cmd) {
        commands[cmd[0]](cmd[1], carMap);
    }

    function process2(cmd) {
        let obj = {};
        obj[cmd[2]] = cmd[3];
        cmd[2] === 'inherit' ? commands[cmd[2]](cmd[1], cmd[3], carMap) : commands[cmd[0]](cmd[1], obj, carMap);
    }
}

solve(['create c1',
    'create c2 inherit c1',
    'set c1 color red',
    'set c2 model new',
    'print c1',
    'print c2']
);