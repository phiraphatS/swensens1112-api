import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { FilesUpload } from 'src/entities/files_upload.entity';
import { ProdCategory } from 'src/entities/prod_category.entity';
import { Product } from 'src/entities/product.entity';
import { DataSource, In, Repository } from 'typeorm';

const is_active = { is_active: 1, is_delete: 0 }
@Injectable()
export class ProductService {

  constructor(
    private dataSource: DataSource,
    @InjectRepository(FilesUpload)
    private FilesUploadRepository: Repository<FilesUpload>,
    @InjectRepository(Product)
    private ProductRepository: Repository<Product>,
    @InjectRepository(Category)
    private CategoryRepository: Repository<Category>,
    @InjectRepository(ProdCategory)
    private ProdCategoryRepository: Repository<ProdCategory>,
  ) { }

  async insertProduct(req: any, fileData: Buffer) {
    const queryRunner = this.dataSource.createQueryRunner()

    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {

      const newFile = this.FilesUploadRepository.create()

      newFile.file_blob = fileData
      newFile.file_raw_name = req.file_name
      newFile.file_size = req.file_size
      newFile.file_mime_type = req.file_mime_type
      newFile.file_ext = req.file_ext
      newFile.file_desc = req.file_desc
      newFile.file_type = 'image/png'

      const saveUser = await queryRunner.manager.save(newFile)
      const file_id = newFile.id
      const newDate = new Date()

      const newProd = this.ProductRepository.create()
      newProd.name = req.name
      newProd.detail = req.detail
      newProd.file_id = file_id
      newProd.price = req.price
      newProd.is_active = 1
      newProd.is_delete = 0
      newProd.created_at = newDate
      newProd.created_by = 0
      newProd.updated_at = newDate
      newProd.updated_by = 0
      const saveProd = await queryRunner.manager.save(newProd)

      const newProdCate = this.ProdCategoryRepository.create()
      newProdCate.product_id = newProd.id
      newProdCate.category_id = req.category_id
      newProdCate.is_active = 1
      newProdCate.is_delete = 0
      newProdCate.created_at = newDate
      newProdCate.created_by = 0
      newProdCate.updated_at = newDate
      newProdCate.updated_by = 0
      const saveProdCate = await queryRunner.manager.save(newProdCate)

      await queryRunner.commitTransaction()
      const results = {
        message: 'success',
        status: true,
        results: null
      }
      return results
    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw null
    } finally {
      await queryRunner.release()
    }
  }

  async getCategory() {
    try {
      const resCategory = await this.CategoryRepository.findBy({ ...is_active })

      let categoryList: any[] = []
      for (const { id, title_th, title_en } of resCategory) {
        categoryList.push({
          title_th: title_th,
          title_en: title_en,
          id: id
        })
      }

      const results = {
        message: 'success',
        status: true,
        results: categoryList
      }

      return results
    } catch (error) {
      throw new HttpException({
        status: false,
        message: error.message,
        results: null
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getProduct(cate_id: number) {
    try {
      let condition = {}
      if (cate_id != 0)
        condition = { id: cate_id }

      const getCategory = await this.CategoryRepository.findBy({ ...condition, ...is_active })
      let getCateIdList: number[] = []
      for (const item of getCategory) {
        getCateIdList.push(item.id)
      }

      const getProdCate = await this.ProdCategoryRepository.findBy({ category_id: In(getCateIdList), ...is_active })
      let getProdIdList: number[] = []
      for (const item of getProdCate) {
        getProdIdList.push(item.product_id)
      }

      const listCategory: any[] = []
      const getFileId: number[] = []
      const getProduct = await this.ProductRepository.findBy({ id: In(getProdIdList), ...is_active })
      for (const item of getCategory) {
        const targetPayload = getProdCate.filter(x => x.category_id == item.id)
        let listProduct: any[] = []
        for (const subItem of targetPayload) {
          const targetProduct = getProduct.find(x => x.id == subItem.product_id)
          listProduct.push({
            id: targetProduct.id,
            name: targetProduct.name,
            detail: targetProduct.detail,
            price: targetProduct.price,
            file_id: targetProduct.file_id,
          })

          getFileId.push(targetProduct.file_id)
        }

        listCategory.push({
          id: item.id,
          title_th: item.title_th,
          title_en: item.title_en,
          product_list: listProduct,
        })
      }

      const getFile = await this.FilesUploadRepository.findBy({ id: In(getFileId)})

      const resultsList:any[] = listCategory.map(item => (
        {
          ...item,
          product_list :item.product_list.map(subi => {
            const targetFile = getFile.find(x => x.id === subi.file_id)
            return {
              ...subi,
              file_blob: targetFile?.file_blob,
              file_type: targetFile?.file_type,
            }
          })
        }
      ))

      const results = {
        message: 'success',
        status: true,
        results: resultsList
      }

      return results
    } catch (error) {
      throw new HttpException({
        status: false,
        message: error.message,
        results: null
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async removeProduct(cate_id: number, product_id: number) {
    const queryRunner = this.dataSource.createQueryRunner()

    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {
      const getProdCate = await this.ProdCategoryRepository.findOneBy({ product_id: product_id, category_id: cate_id, ...is_active})
      getProdCate.is_delete = 1
      getProdCate.is_active = 0
      getProdCate.updated_at = new Date()
      const saveUser = await queryRunner.manager.save(getProdCate)
      await queryRunner.commitTransaction()
      const results = {
        message: 'success',
        status: true,
        results: null
      }
      return results
    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw null
    } finally {
      await queryRunner.release()
    }
  }

  async edit(req) {
    const queryRunner = this.dataSource.createQueryRunner()

    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {
      const getProdProd = await this.ProductRepository.findOneBy({ id: req.product_id, ...is_active})
      
      getProdProd.name = req.name
      getProdProd.detail = req.detail
      getProdProd.price = req.price
      getProdProd.updated_at = new Date()
      const saveUser = await queryRunner.manager.save(getProdProd)
      await queryRunner.commitTransaction()
      const results = {
        message: 'success',
        status: true,
        results: null
      }
      return results
    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw null
    } finally {
      await queryRunner.release()
    }
  }

  async createCategory(req: any) {
    const queryRunner = this.dataSource.createQueryRunner()

    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {
      const newDate = new Date()
      const newCate = this.CategoryRepository.create()
      newCate.title_th = req.title_th
      newCate.title_en = req.title_en
      newCate.is_active = 1
      newCate.is_delete = 0
      newCate.created_at = newDate
      newCate.created_by = 0
      newCate.updated_at = newDate
      newCate.updated_by = 0
      const saveCategory = await queryRunner.manager.save(newCate)

      await queryRunner.commitTransaction()
      const results = {
        message: 'success',
        status: true,
        results: null
      }
      return results

    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw null
    } finally {
      await queryRunner.release()
    }
  }

  async removeCategory(cate_id: number) {
    const queryRunner = this.dataSource.createQueryRunner()

    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {
      const newDate = new Date()
      const resCate = await this.CategoryRepository.findOneBy({ ...is_active, id: cate_id})
      resCate.is_active = 0
      resCate.is_delete = 1
      resCate.updated_at = newDate
      const saveCategory = await queryRunner.manager.save(resCate)

      await queryRunner.commitTransaction()
      const results = {
        message: 'success',
        status: true,
        results: null
      }
      return results

    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw null
    } finally {
      await queryRunner.release()
    }
  }
}
