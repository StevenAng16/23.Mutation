Mutation

1. Mutasi pada dasarnya adalah fungsi untuk memperbarui, menyisipkan dan menghapus data.

2. Query dan Mutation untuk memasukkan data baru atau memperbarui data.

3.  Mutation dengan Apollo Client
 Insert Data untuk meng-insert sebuah data dengan menggunakan dua parameter  yaitu nama tabel dan data yang akan di masukkan. Contoh: $data=array('nama_field1'=>'isi_field1',
'nama_field2'=>'isi_field2' );
$this->db->set($data);
$this->db->insert('nama_tabel'); atau 
$this->db->set('nama_field1','isi_field1');
$this->db->set('nama_field2','isi_field2');
$this->db->insert('nama_tabel');
 Update Data untuk update penggunaan atau penulisan syintak-syintak nya tidak jauh berbeda dengan fungsi insert data. Contoh :
$this->db->set('nama_field1','isi_field1');
$this->db->set('nama_field2','isi_field2');
$this->db->update('nama_tabel');
Query di atas akan menghasilkan  query 
"update nama_tabel set nama_field1=isi_field1,set nama_field2=isi_field2". Adapun cara yang lebih sederhana yakni menggunakan array assosiatif.
$data=array('nama_field1'=>'isi_field1',
'nama_field2'=>'isi_field2' );
$this->db->where('kalian ingin mengedit berdasarkan apa');
$this->db->update('nama_tabel',$data);
 Delete Data untuk melakukan delete data pada Codeigniter kita dapat menggunakan perintah berikut ini :
$this->db->where('id');
$this->db->delete('nama_tabel');
