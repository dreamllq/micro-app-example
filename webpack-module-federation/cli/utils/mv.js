const fs = require('fs');
const path = require('path');
 
module.exports = (sourceFolderPath, targetFolderPath)=>{
  // 创建新的目标文件夹（如果不存在）
  if (!fs.existsSync(targetFolderPath)) {
    fs.mkdirSync(targetFolderPath);
  }

  // 获取源文件夹内所有文件和子文件夹的列表
  const filesAndFolders = fs.readdirSync(sourceFolderPath);
  filesAndFolders.forEach((item) => {
    const itemPath = path.join(sourceFolderPath, item);
    
    // 判断当前项是否为文件夹
    if (fs.statSync(itemPath).isDirectory()) {
        // 递归调用自身处理子文件夹
        moveFolderRecursive(itemPath, targetFolderPath + '/' + item);
        
        // 删除原始文件夹及其内容
        deleteFolderRecursive(itemPath);
    } else {
        // 将文件复制到目标位置并删除原始文件
        fs.copyFileSync(itemPath, targetFolderPath + '/' + item);
        fs.unlinkSync(itemPath);
    }
  });

  function moveFolderRecursive(sourceFolderPath, targetFolderPath) {
    // 创建新的目标文件夹（如果不存在）
    if (!fs.existsSync(targetFolderPath)) {
        fs.mkdirSync(targetFolderPath);
    }

    // 获取源文件夹内所有文件和子文件夹的列表
    const filesAndFolders = fs.readdirSync(sourceFolderPath);
    filesAndFolders.forEach((item) => {
      const itemPath = path.join(sourceFolderPath, item);
      
      // 判断当前项是否为文件夹
      if (fs.statSync(itemPath).isDirectory()) {
          // 递归调用自身处理子文件夹
          moveFolderRecursive(itemPath, targetFolderPath + '/' + item);
          
          // 删除原始文件夹及其内容
          deleteFolderRecursive(itemPath);
      } else {
          // 将文件复制到目标位置并删除原始文件
          fs.copyFileSync(itemPath, targetFolderPath + '/' + item);
          fs.unlinkSync(itemPath);
      }
    });
  }

  function deleteFolderRecursive(folderPath) {
    if (fs.existsSync(folderPath)) {
        const filesAndFolders = fs.readdirSync(folderPath);
        filesAndFolders.forEach((item) => {
            const itemPath = path.join(folderPath, item);
            
            // 判断当前项是否为文件夹
            if (fs.statSync(itemPath).isDirectory()) {
                // 递归调用自身处理子文件夹
                deleteFolderRecursive(itemPath);
            } else {
                // 删除文件
                fs.unlinkSync(itemPath);
            }
        });
        
        // 最后删除空文件夹
        fs.rmdirSync(folderPath);
    }
  }
}