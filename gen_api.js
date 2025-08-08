const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const path = './app/src'
rl.question('Enter the Service Name(only lowercase letters): ', (servicename) => {
  try {
    const filePath = `${path}/${servicename}`;

    fs.cpSync('./template', filePath, { recursive: true });
    const updatedModule = fs.readFileSync(`${filePath}/todo.module.ts`, 'utf8')
      .replace(/todo/g, servicename)
      .replace(/Todo/g, `${servicename.charAt(0).toUpperCase()}${servicename.slice(1)}`)
      .replace(/TODO/g, servicename.toUpperCase());
    fs.writeFileSync(`${filePath}/${servicename}.module.ts`, updatedModule);
    fs.rmSync(`${filePath}/todo.module.ts`);

    /** Empty Files */
    fs.renameSync(`${filePath}/todo.enum.ts`, `${filePath}/${servicename}.enum.ts`);
    fs.renameSync(`${filePath}/todo.constant.ts`, `${filePath}/${servicename}.constant.ts`);
    

    const updatedController = fs.readFileSync(`${filePath}/controller/todo.controller.ts`, 'utf8')
      .replace(/todo/g, servicename)
      .replace(/Todo/g, `${servicename.charAt(0).toUpperCase()}${servicename.slice(1)}`)
      .replace(/TODO/g, servicename.toUpperCase());
    fs.writeFileSync(`${filePath}/controller/${servicename}.controller.ts`, updatedController);
    fs.rmSync(`${filePath}/controller/todo.controller.ts`);

    fs.renameSync(`${filePath}/dto/todo.dto.ts`, `${filePath}/dto/${servicename}.dto.ts`);

    fs.renameSync(`${filePath}/exception/todo.exception.ts`, `${filePath}/exception/${servicename}.exception.ts`);

    fs.renameSync(`${filePath}/entity/todo.template.entity.ts`, `${filePath}/entity/${servicename}.template.entity.ts`);

    fs.renameSync(`${filePath}/service/todo.template.service.ts`, `${filePath}/service/${servicename}.template.service.ts`);
    rl.close();
  } catch (error) {
    console.error('Error:', error);
    rl.close();
  }
});