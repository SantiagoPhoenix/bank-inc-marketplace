import { Injectable } from '@angular/core';
import * as ExcelJS from 'exceljs';
import * as FileSaver from 'file-saver'
import { IProductCart } from '../shared/interfaces/iproduct';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  /**
   * Method that create the excel file with the products inside the shopping cart
   * @param products -> Products list
   */

  generateExcel(products: Array<IProductCart>) {
    const workbook = new ExcelJS.Workbook(); //Create the workBook
    const worksheet = workbook.addWorksheet('Products'); //Add the name of the Sheet

    //Add the columns of titles
    worksheet.columns = [
      { header: 'ID', key: 'id' },
      { header: 'Title', key: 'title' },
      { header: 'Price', key: 'price' },
      { header: 'Description', key: 'description' },
      { header: 'Images', key: 'images' },
      { header: 'CreatedAt', key: 'creationAt' },
      { header: 'UpdatedAt', key: 'updatedAt' },
      { header: 'Category ID', key: 'categoryId' },
      { header: 'Category Name', key: 'categoryName' },
      { header: 'Category Image', key: 'categoryImage' },
      { header: 'Category CreatedAt', key: 'categoryCreatedAt' },
      { header: 'Category UpdatedAt', key: 'categoryUpdatedAt' },
      { header: 'Amount', key: 'amount' },
    ];

    //Set data
    products.forEach((product) => {
      worksheet.addRow({
        id: product.id,
        title: product.title,
        price: product.price,
        description: product.description,
        images: product.images.join(', '), //Join the img name in one string
        creationAt: product.creationAt,
        updatedAt: product.updatedAt,
        categoryId: product.category.id,
        categoryName: product.category.name,
        categoryImage: product.category.image,
        categoryCreatedAt: product.category.creationAt,
        categoryUpdatedAt: product.category.updatedAt,
        amount: product.amount,
      });
    });

    //Create a basic style
    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.alignment = { vertical: 'middle', horizontal: 'left' };
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
      });
    });

    //write the blob and download the file
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'products.xlsx');
    });
  }
}
