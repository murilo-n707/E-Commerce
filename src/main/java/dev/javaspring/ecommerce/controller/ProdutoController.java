package dev.javaspring.ecommerce.controller;

import dev.javaspring.ecommerce.model.Produto;
import dev.javaspring.ecommerce.repository.ProdutoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/produtos")
@CrossOrigin(origins = "*")
public class ProdutoController {

    private final ProdutoRepository repository;

    public ProdutoController(ProdutoRepository repository){
        this.repository = repository;
    }

    @PostMapping
    public ResponseEntity<?> cadastrar(
            @ModelAttribute Produto produto,
            @RequestParam("arquivoImagem") MultipartFile arquivoImagem ) throws java.io.IOException {
        if (repository.existsByNome(produto.getNome())){
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Erro: Já existe um produto cadastrado com esse nome.");
        } else {
            if (arquivoImagem != null && !arquivoImagem.isEmpty()) {
                produto.setImagem(arquivoImagem.getBytes());
            }
            repository.save(produto);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body("Produto cadastrado com sucesso");
        }
    }

    @GetMapping("/listar")
    public List<Produto> listarTodos(){
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produto> buscarPorId(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Produto> remover(@PathVariable Long id){

        if (!repository.existsById(id)){
            return ResponseEntity
                    .notFound()
                    .build();
        }else{
            repository.deleteById(id);
            return ResponseEntity
                    .noContent()
                    .build();
        }
    }
}