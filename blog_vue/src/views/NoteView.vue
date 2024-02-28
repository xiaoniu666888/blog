<script setup>
import { reactive, ref } from 'vue'
import { userStore } from '@/stores'
import { upNoteInfo, checkTitle } from '@/api/notes'
const useStore = userStore()
const noteForm = ref()
// 表单加载动画
const loading = ref(false)
// 表单双向绑定
const form = reactive({
    title: '',
    desc: '',
    selectedType: '',
    selectedTag: '',
    noteImgUrl: '',
    noteFileUrl: ''
})

// 表单规则
const rules = reactive({
    title: [{ required: true, message: '标题不能为空', trigger: 'blur' }],
    desc: [{ required: true, message: '描述不能为空', trigger: 'blur' }],
    // selectedType: [{ required: true, message: '分类不能为空', trigger: 'blur' }]
    // selectedTag: [{ required: true, message: '标签不能为空', trigger: 'blur' }]
})
const headers = {
    "Authorization": "Bearer " + useStore.userInfo.token
}
// 文章分类
const types = reactive(
    [
        {
            id: 1,
            type: '前端',
            tags: ['html', 'css', 'js']
        },
        {
            id: 2,
            type: '后端',
            tags: ['node', 'mongoDB']
        }
    ]
)
// 选择标签
const fliteredTags = ref([])
// 选择分类
const getTypes = (event) => {
    form.selectedTag = ''
    const res = types.filter(item => item.type === event)
    fliteredTags.value = res[0].tags
}

// 文章缩略图
const thumbnail = ref()
// 笔记文件
const notefile = ref()

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)

// 移除已上传的图片
const handleRemove = (file) => {
    if (!file) return
    thumbnail.value.handleRemove(file)
}



const handlePictureCardPreview = (file) => {
    dialogImageUrl.value = file.url
    dialogVisible.value = true
}
// 图片上传成功 
const handleUploadImgSuccess = (response) => {
    if (response && response.data) {
        form.noteImgUrl = response.data;
    }
}
// 文件上传成功 
const handleUploadFileSuccess = (response) => {
    if (response && response.data) {
        form.noteFileUrl = response.data;
    }
}
// 提交表单
const onSubmit = (formEl) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (valid) {
            // 检查标题是否重复
            const bol = await checkTitle({ title: form.title })
            if (!bol) return
            loading.value = !loading.value
            // 标题不重复才上传  
            if (thumbnail.value) {
                thumbnail.value.submit();
            }
            if (notefile.value) {
                notefile.value.submit();
            }
            setTimeout(async () => {
                upNoteInfo({ ...form, noteAuthor: useStore.userInfo.nickname }).then((res) => {
                    if (res) {
                        reset()
                        loading.value = !loading.value
                    }
                })
            }, 2000)
        }
    })
}


const reset = () => {
    form.noteFileUrl = ''
    form.noteImgUrl = ''
    noteForm.value.resetFields();
    thumbnail.value.clearFiles();
    notefile.value.clearFiles();
}


</script>

<template>
    <div id="note-view">
        <h2 class="form-title">上传笔记</h2>

        <el-form v-loading="loading" class="upForm" ref="noteForm" :model="form" :rules="rules" label-width="120px">

            <el-form-item label="文章标题" prop="title">
                <el-input v-model="form.title" />
            </el-form-item>

            <el-form-item label="文章描述" prop="desc">
                <el-input v-model="form.desc" type="textarea" />
            </el-form-item>

            <el-form-item label="文章分类" prop="selectedType">
                <el-select v-model="form.selectedType" value-key="id" placeholder="请选择分类" @change="getTypes($event)">
                    <el-option v-for="item in types" :label="item.type" :key="item.id" :value="item.type" />
                </el-select>
            </el-form-item>

            <el-form-item label="标签" prop="selectedTag">
                <el-select v-model="form.selectedTag" placeholder="请选择标签">
                    <el-option v-for="item in fliteredTags" :label="item" :key="item" :value="item" />
                </el-select>
            </el-form-item>

            <el-form-item label="文章缩略图">
                <el-upload ref="thumbnail" action="/api/notes/img" :headers="headers" :limit="1" list-type="picture-card"
                    :auto-upload="false" :on-success="handleUploadImgSuccess">
                    <el-icon>
                        <Plus />
                    </el-icon>
                    <template #file="{ file }">
                        <div>
                            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                            <span class="el-upload-list__item-actions">
                                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                                    <el-icon><zoom-in /></el-icon>
                                </span>

                                <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                                    <el-icon>
                                        <Delete />
                                    </el-icon>
                                </span>
                            </span>
                        </div>
                    </template>
                </el-upload>
                <el-dialog v-model="dialogVisible">
                    <img style="width: 100%;" :src="dialogImageUrl" alt="Preview Image" />
                </el-dialog>

            </el-form-item>
            <el-form-item label="请上传文章">
                <el-upload ref="notefile" class="upload-demo" drag action="/api/notes/file" :headers="headers"
                    :auto-upload="false" :limit="1" :on-success="handleUploadFileSuccess">
                    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                    <div class="el-upload__text">
                        <em>可以拖拽上传</em>
                    </div>
                </el-upload>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit(noteForm)">提交</el-button>
                <el-button @click="reset">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>


<style scoped>
#note-view {
    text-align: center;

    .form-title {
        color: #42bdee;
        font-size: 20px;
        font-weight: bold;
        padding-bottom: 20px;
        margin-top: 5px;

    }

    .upForm {
        padding-right: 2vw;
    }

    .upload-demo {
        width: 150px;
    }

}
</style>@/stores