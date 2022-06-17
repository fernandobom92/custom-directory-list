#!/usr/bin/env node

import fs from "fs";
import util from "util";
import chalk from "chalk";
import path from "path";

//require nao estava funcionando porque chalk está em ESM e não aceita o comando require, tive que usar import()

const { lstat } = fs.promises;

const targetDir = process.argv[2] || process.cwd();

fs.readdir(targetDir, async (err, filenames) =>{
    if (err) {
        console.log(err);
    }

    const statPromises = filenames.map(filename =>{
        return lstat(path.join(targetDir, filename));        
    });

    const allStats = await Promise.all(statPromises); //espera todas as promises serem resolvidas

    for (let stats of allStats) {
        const index = allStats.indexOf(stats);

        if (stats.isFile()) {
            console.log(chalk.italic(filenames[index]));
        } else {
            console.log(chalk.bold(filenames[index]));
        }
    }
    
});