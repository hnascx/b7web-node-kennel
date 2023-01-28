import { Request, Response } from 'express'
import { createMenuObject } from '../helpers/CreateMenuObject'
import { Pet } from '../models/Pet'

export const search = (req: Request, res: Response) => {
  let query: string = req.query.q as string

  if(!query) {
    res.redirect('/')
    return
  }

  let list = Pet.getFromName(query)
  {{>partials/header}}

  {{#banner}}
  <section class="banner" style="background-image: url('images/{{ background }}')">{{ title }}</section>
  <h2>{{ title }} disponíveis para adoção</h2>
  {{/banner}}
  
  <div class="container list">
      {{#list}}
      <div class="item">
          <img src="images/{{ image }}" class="item--image" />
          <div class="item--name">{{ name }}</div>
          <div class="item--color">{{ color }}</div>
          <div class="item--genre">{{ sex }}</div>
      </div>
      {{/list}}
  </div>
  
  {{^list}}
  <div class="container no-list">
      <h2>Animal não encontrado!</h2>
  </div>
  {{/list}}
  
  {{>partials/footer}}
  res.render('pages/page', {
    menu: createMenuObject(''),
    list,
    query
  })
}